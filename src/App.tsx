import Container from './components/UI/layout/Container';
import Root from './pages/Root';

import NoticeStore from './storage/notice';

function App() {
  return (
    <Container maxWidth='sm'>
      <NoticeStore>
        <Root />
      </NoticeStore>
    </Container>
  );
}

export default App;
