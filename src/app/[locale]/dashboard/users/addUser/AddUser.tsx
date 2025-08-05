'use client'
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { IUser } from '@/types/users';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const AddUser = () => {
  const t = useTranslations('Users');

  const schema = z.object({
    name: z.string().min(1, { message: t('name_is_required') }),
    email: z.string().email({ message: t('invalid_email') }),
    password: z.string().min(6, { message: t('password_min_length') }),
    role: z.string(),
  });

  const { register, handleSubmit, formState: { errors } } = useForm<IUser>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: IUser) => {
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
      <TextField
        label={t('password')}
        type="password"
        {...register('password')}
        error={!!errors.password}
        helperText={errors.password?.message}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>{t('role')}</InputLabel>
        <Select {...register('role')} defaultValue="user">
          <MenuItem value="user">{t('user')}</MenuItem>
          <MenuItem value="admin">{t('admin')}</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary">{t('add_user')}</Button>
    </form>
  );
};

export default AddUser;
