-- Add banner_url column to profiles table
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS banner_url TEXT;

-- Create storage bucket for banners if it doesn't exist (though we might reuse avatars or create a new one)
-- For simplicity, let's reuse the 'avatars' bucket or create a 'banners' bucket.
-- Let's create a separate 'banners' bucket for clarity and better access control if needed later.

INSERT INTO storage.buckets (id, name, public) 
VALUES ('banners', 'banners', true)
ON CONFLICT (id) DO NOTHING;

-- Policy to allow authenticated users to upload their own banner
CREATE POLICY "Users can upload their own banner"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'banners' AND (storage.foldername(name))[1] = auth.uid()::text );

-- Policy to allow authenticated users to update their own banner
CREATE POLICY "Users can update their own banner"
ON storage.objects FOR UPDATE
TO authenticated
USING ( bucket_id = 'banners' AND (storage.foldername(name))[1] = auth.uid()::text );

-- Policy to allow public to view banners
CREATE POLICY "Anyone can view banners"
ON storage.objects FOR SELECT
TO public
USING ( bucket_id = 'banners' );

-- Policy to allow users to delete their own banner
CREATE POLICY "Users can delete their own banner"
ON storage.objects FOR DELETE
TO authenticated
USING ( bucket_id = 'banners' AND (storage.foldername(name))[1] = auth.uid()::text );
