'use client'
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { UserType } from '@/types/users';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

interface EditUserProps {
  user: UserType;
}

const EditUser: React.FC<EditUserProps> = ({ user }) => {
  const t = useTranslations('Users');

  const schema = z.object({
    name: z.string().min(1, { message: t('name_is_required') }),
    email: z.string().email({ message: t('invalid_email') }),
    role: z.string(),
  });

  const { register, handleSubmit, formState: { errors } } = useForm<UserType>({
    resolver: zodResolver(schema),
    defaultValues: user,
  });

  const onSubmit = (data: UserType) => {
    // Handle form submission here
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label={t('name')}
        {...register('name')}
        error={!!errors.name}
        helperText={errors.name?.message}
        fullWidth
        margin="normal"
      />
      <TextField
        label={t('email')}
        {...register('email')}
        error={!!errors.email}
        helperText={errors.email?.message}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>{t('role')}</InputLabel>
        <Select {...register('role')} defaultValue={user.role}>
          <MenuItem value="user">{t('user')}</MenuItem>
          <MenuItem value="admin">{t('admin')}</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary">{t('save_changes')}</Button>
    </form>
  );
};

export default EditUser;
