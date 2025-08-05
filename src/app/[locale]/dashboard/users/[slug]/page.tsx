'use client'
import React from 'react';
import EditUser from './EditUser';
import { useUsers } from '@/lib/API/hooks/useUsers';

const Page = ({ params }: { params: { slug: string } }) => {
  const { data, isLoading, error } = useUsers();
  const user = data?.data.find((user) => user._id === params.slug);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !user) {
    return <div>Error or user not found.</div>;
  }

  return <EditUser user={user} />;
};

export default Page;
