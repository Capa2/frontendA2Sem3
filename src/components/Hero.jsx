import logo from '../img/logo.png';

export default function Hero() {
    return (
        <div className="p-3 hero">
            <img className="d-inline-block float-start align-middle" style={{ marginRight: '0.5rem', marginBottom: '0.5rem' }} src={logo} height="auto" width="50px" alt="logo" />
            <h1 className="align-middle">Booksave</h1>
        </div>
    );
}