'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useBasename } from '@/lib/basename/useBasename';
import { profileFormSchema } from '@/repository/user/schema';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { usePrivy } from '@privy-io/react-auth';
import { useFormStatus } from 'react-dom';
import { useEffect, useState } from 'react';
import { handleProfileFormAction } from './action';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className="w-full bg-black text-white rounded-full py-6 text-lg font-bold hover:bg-gray-900"
      disabled={pending}
    >
      {pending ? '作成中...' : 'プロフィールを作成'}
    </Button>
  );
}

export function ProfileForm() {
  const { user } = usePrivy();
  const basename = useBasename(undefined, true);
  const [error, setError] = useState<string | null>(null);

  const [form, fields] = useForm({
    id: 'profile-form',
    shouldValidate: 'onInput',
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
    <form
      className="space-y-6"
      id={form.id}
      action={clientAction}
    >
      <input
        type="hidden"
        name={fields.email.name}
        value={user?.email?.address || ''}
      />

      {error && (
        <div className="p-4 rounded-lg bg-red-100 text-red-700">
          {error}
        </div>
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
          className={`rounded-2xl border-gray-200 bg-gray-50 px-4 py-6 text-lg ${
            fields.username.errors ? 'border-red-500' : ''
          }`}
          defaultValue={basename ?? ''}
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
}
