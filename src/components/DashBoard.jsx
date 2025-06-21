import { Title, Group } from '@mantine/core';
import Curriculum from './Curriculum'
import DownloadButton from './DownloadButton'

function DashBoard({ course }) {
    return (
        <>
            {course.courseMaterials && course.courseMaterials.length > 0 && (
                <>
                    <Title order={3} mb='md'>강의 자료</Title>
                    <Group spacing='xs' mb='md'>
                        {course.courseMaterials.map((material, index) => (
                            <DownloadButton
                                key={index}
                                title={material.title}
                                materialPath={material.materialPath}
                            />
                        ))}
                    </Group>
                </>
            )}

            <Curriculum sections={course.sections} />
        </>
    );
}

export default DashBoard;