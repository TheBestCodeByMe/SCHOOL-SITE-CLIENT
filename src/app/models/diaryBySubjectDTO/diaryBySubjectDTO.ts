import {DiaryBySubjectDTOList} from "./diaryBySubjectDTOList";
import {Observable} from "rxjs";

export class DiaryBySubjectDTO {
  subject: string;
  classname: string;
  diaries: DiaryBySubjectDTOList[];
}
