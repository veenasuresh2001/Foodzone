import Nav from 'react-bootstrap/Nav';

function Userheader() {
  return (
    <Nav variant="pills" defaultActiveKey="/home">
      <Nav.Item>
        <Nav.Link href="/home" >Active</Nav.Link>
      </Nav.Item>
      
      <Nav.Item>
        <Nav.Link href="viewall">View customers</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="profile">
          profile
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
export default Userheader;