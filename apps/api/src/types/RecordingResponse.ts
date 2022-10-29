export interface RecordingResponse {
  id: number;
  recording_count: number;
  recording_files: RecordingFile[];
}

export interface RecordingFile {
  id: string;
  meeting_id: string;
  file_size: number;
  download_url: string;
}
