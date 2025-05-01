'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { profileFormSchema } from '@/repository/user/schema';
import type { User } from '@/types/database';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { forwardRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { handleProfileFormAction } from './action';

interface ProfileEditFormProps {
  user: User;
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className="w-full bg-black text-white rounded-full py-6 text-lg font-bold hover:bg-gray-900"
      disabled={pending}
    >
      {pending ? 'Updating...' : 'Update Profile'}
    </Button>
  );
}

export const ProfileEditForm = forwardRef<
  HTMLFormElement,
  ProfileEditFormProps
>(function ProfileEditForm({ user }, ref) {
  const [error, setError] = useState<string | null>(null);

  const defaultValues = {
    username: user.username,
    bio: user.bio || '',
    email: user.email || null,
  };

  const [form, fields] = useForm({
    id: 'profile-edit-form',
    shouldValidate: 'onInput',
    defaultValue: defaultValues,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: profileFormSchema });
    },
  });

  const clientAction = async (formData: FormData) => {
    try {
      await handleProfileFormAction(formData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'エラーが発生しました');
    }
  };

  return (
    <form className="space-y-6" id={form.id} action={clientAction} ref={ref}>
      <input type="hidden" name="userId" value={user.id} />
      <input type="hidden" name={fields.email.name} value={user.email || ''} />

      {error && (
        <div className="p-4 rounded-lg bg-red-100 text-red-700">{error}</div>
      )}

      <div className="space-y-2">
        <div className="flex justify-between">
          <label htmlFor={fields.username.id} className="text-lg font-medium">
            Username
          </label>
        </div>
        <Input
          id={fields.username.id}
          name={fields.username.name}
          defaultValue={user.username}
          className={`rounded-2xl border-gray-200 bg-gray-50 px-4 py-6 text-lg ${
            fields.username.errors ? 'border-red-500' : ''
          }`}
          required
        />
        {fields.username.errors && (
          <p className="text-red-500 text-sm">{fields.username.errors}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor={fields.bio.id} className="text-lg font-medium">
          Bio
        </label>
        <div className="relative">
          <Textarea
            id={fields.bio.id}
            name={fields.bio.name}
            defaultValue={user.bio || ''}
            placeholder="Tell us about you..."
            className={`rounded-2xl border-gray-200 bg-gray-50 min-h-[150px] p-4 text-lg resize-none ${
              fields.bio.errors ? 'border-red-500' : ''
            }`}
          />
          {fields.bio.errors && (
            <p className="text-red-500 text-sm">{fields.bio.errors}</p>
          )}
        </div>
      </div>

      <div className="p-4 mt-auto">
        <SubmitButton />
      </div>
    </form>
  );
});
