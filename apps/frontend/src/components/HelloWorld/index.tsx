'use client';

import { useQuery } from '@tanstack/react-query';

export const HelloWorld = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['hello-world'],
    queryFn: async () => {
      const res = await fetch('/api/hello-world');
      return res.json();
    },
  });

  return (
    <div className="text-2xl font-bold mb-50">
      {isLoading && <pre>{JSON.stringify({ isLoading }, null, 2)}</pre>}
      {error && <pre>{JSON.stringify({ error: error.message }, null, 2)}</pre>}
      {data && <pre>{JSON.stringify({ data }, null, 2)}</pre>}
    </div>
  );
};
