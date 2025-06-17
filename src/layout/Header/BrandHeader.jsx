import { Link } from 'react-router-dom';

const BrandHeader = () => {
    return <Link
        to={'/'}
        style={{ display: 'flex', alignItems: 'center' }}
    >
        <img
            src='https://cdn.inflearn.com/assets/brand/logo.png'
            alt='Inflearn Logo'
            style={{ height: 20 }}
        />
    </Link>
}

export default BrandHeader;