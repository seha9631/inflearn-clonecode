import { useParams } from "react-router-dom";

const Course = () => {
    const params = useParams();

    return <div>Course {params.id}</div>
}

export default Course;