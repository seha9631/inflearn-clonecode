import { useParams } from 'react-router-dom';
import courses from '../data/courses.json';

function LecturePlayer() {
    const { courseCode, lectureCode } = useParams();
    console.log(courseCode)
    console.log(lectureCode)

    const course = courses.find(c => c.courseCode === courseCode);
    const lecture = course?.sections
        .flatMap(section => section.lectures)
        .find(lec => lec.lectureCode === lectureCode);

    if (!course || !lecture) {
        return <div>강의나 코스를 찾을 수 없습니다.</div>;
    }

    return (
        <div>
            <h1>{course.title} - {lecture.title}</h1>
            <video src={lecture.videoUrl} controls />
        </div>
    );
}

export default LecturePlayer;