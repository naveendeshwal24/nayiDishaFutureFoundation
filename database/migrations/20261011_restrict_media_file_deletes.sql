BEGIN;

DROP POLICY IF EXISTS "Allow authenticated deletes from media buckets" ON storage.objects;
CREATE POLICY "Allow authenticated deletes from media buckets"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    (bucket_id = 'images' AND EXISTS (
      SELECT 1
      FROM public.media_items
      WHERE file_path = name
        AND type = 'image'
        AND uploaded_by = (SELECT auth.uid())
    ))
    OR
    (bucket_id = 'videos' AND EXISTS (
      SELECT 1
      FROM public.media_items
      WHERE file_path = name
        AND type = 'video'
        AND uploaded_by = (SELECT auth.uid())
    ))
  );

COMMIT;
