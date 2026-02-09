'use client';

import { useState } from 'react';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState('');

  async function uploadFile() {
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/admin/upload', {
      method: 'POST',
      headers: { 'x-admin-password': password },
      body: formData
    });

    setStatus(response.ok ? 'Файл загружен.' : 'Ошибка загрузки.');
  }

  async function rebuildIndex() {
    const response = await fetch('/api/admin/reindex', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-password': password }
    });
    const data = await response.json();
    setStatus(data.message || 'Индекс обновлён.');
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-semibold">Админка базы знаний</h1>
      <p className="mt-4 text-muted">
        Загрузите новые файлы (markdown, txt, pdf) и пересоберите индекс. Доступ защищён паролем из ENV.
      </p>
      <div className="mt-8 space-y-4">
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Пароль администратора"
          className="w-full rounded-2xl border border-white/10 bg-card px-4 py-3"
        />
        <input
          type="file"
          onChange={(event) => setFile(event.target.files?.[0] || null)}
          className="w-full rounded-2xl border border-white/10 bg-card px-4 py-3"
        />
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={uploadFile}
            className="rounded-full bg-brand-500 px-5 py-3 text-sm text-white"
          >
            Загрузить файл
          </button>
          <button
            type="button"
            onClick={rebuildIndex}
            className="rounded-full border border-white/10 px-5 py-3 text-sm"
          >
            Пересобрать индекс
          </button>
        </div>
        {status && <p className="text-sm text-muted">{status}</p>}
      </div>
    </div>
  );
}
