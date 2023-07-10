import Modal from 'react-bootstrap/Modal';
import { useRouter } from 'next/router';

function SignupMessageModal(props) {
  const router = useRouter();
  console.log('SignupMessageModal entered!');

  return (
    <>
      <Modal>
        <Modal.Header>
          <Modal.Title>
            <h2>Welcome to Movie Search Engine {props.userName}!</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button
            onClick={() => {
              router.push('/login');
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SignupMessageModal;
