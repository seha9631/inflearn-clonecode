import { Title, Group } from '@mantine/core';
import Curriculum from './Curriculum'
import DownloadButton from '../../components/DownloadButton'
import useCourseMaterials from '../../hooks/useCourseMaterials'

function DashBoard({ courseCode, sections, lectures, isEnrolled }) {
    const { materials, loading, error } = useCourseMaterials(courseCode);

    return (
        <>
            {materials && materials.length > 0 && (
                <>
                    <Title order={3} mb='md'>강의 자료</Title>
                    {error ? (
                        <div>에러가 발생했습니다: {error.message}</div>
                    ) : loading ? (
                        <div>로딩 중입니다...</div>
                    ) : (
                        <Group spacing='xs' mb='md'>
                            {materials.map((material, index) => (
                                <DownloadButton
                                    key={index}
                                    title={material.title}
                                    materialPath={material.materialPath}
                                />
                            ))}
                        </Group>
                    )
                    }
                </>
            )}

            <Curriculum
                courseCode={courseCode}
                sections={sections}
                lectures={lectures}
                isEnrolled={isEnrolled}
            />
        </>
    );
}

export default DashBoard;