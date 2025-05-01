'use server';

import { getPrivyId } from '@/lib/auth';
import { updateUser } from '@/repository/user/actions';
import { type ProfileForm, profileFormSchema } from '@/repository/user/schema';
import { parseWithZod } from '@conform-to/zod';
import { redirect } from 'next/navigation';

export async function handleProfileFormAction(formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: profileFormSchema,
  });

  if (submission.status === 'error') {
    if (!submission.error) {
      throw new Error('バリデーションエラーが発生しました');
    }

    const firstError = Object.entries(submission.error).find(
      ([, errors]) => errors && errors.length > 0,
    );

    throw new Error(firstError?.[1]?.[0] || 'バリデーションエラーが発生しました');
  }

  const profileData: ProfileForm = {
    username: String(submission.payload.username),
    bio: submission.payload.bio ? String(submission.payload.bio) : null,
    email: submission.payload.email ? String(submission.payload.email) : null,
    imageUrl: submission.payload.imageUrl
      ? String(submission.payload.imageUrl)
      : null,
  };

  try {
    const privyId = await getPrivyId();
    if (!privyId) {
      throw new Error('認証情報の取得に失敗しました');
    }

    await updateUser(privyId, profileData);
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'エラーが発生しました');
  }

  redirect('/chat');
}
