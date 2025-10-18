import React, { useState, useRef } from 'react';
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { ProfileAvatar } from '@pocky/ui';

interface AvatarUploadProps {
  currentAvatar?: string;
  name?: string;
  onAvatarChange: (avatarUrl: string) => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const AvatarUpload: React.FC<AvatarUploadProps> = ({
  currentAvatar,
  name = 'Avatar',
  onAvatarChange,
  className = '',
  size = 'lg',
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentAvatar || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      alert('Tipo de arquivo inválido. Use JPEG, PNG, GIF ou WebP.');
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      alert('Arquivo muito grande. Tamanho máximo é 5MB.');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreviewUrl(result);
      uploadAvatar(file);
    };
    reader.readAsDataURL(file);
  };

  const uploadAvatar = async (file: File) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload/avatar', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erro ao fazer upload');
      }

      const data = await response.json();
      onAvatarChange(data.avatarUrl);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Erro ao fazer upload do avatar. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    setPreviewUrl(null);
    onAvatarChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative group">
        <ProfileAvatar
          src={previewUrl || undefined}
          name={name}
          size={size}
          className="cursor-pointer transition-opacity group-hover:opacity-90"
          onClick={handleClick}
        />

        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
          </div>
        )}

        {/* Upload button overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            type="button"
            onClick={handleClick}
            className="bg-black bg-opacity-75 text-white rounded-full p-2 hover:bg-opacity-90 transition-colors"
            disabled={isUploading}
          >
            <PhotoIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Remove button */}
        {(previewUrl || currentAvatar) && (
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
          >
            <XMarkIcon className="h-3 w-3" />
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/gif,image/webp"
        onChange={handleFileSelect}
        className="hidden"
      />

      <p className="text-xs text-gray-500 mt-2">
        Clique para alterar o avatar
      </p>
    </div>
  );
};