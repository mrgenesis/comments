import UILinearProgress from "../UI/feedback/LinearProgress ";
import UIBox from "../UI/layout/Box";
import UITypography from "../UI/dataDisplay/Typography";

const Loader: React.FC<{ message: string }> = ({ message }) => {
  return (
    <>
      <UIBox sx={{ width: '100%' }}>
        <UILinearProgress />
        <UITypography sx={{ textAlign: 'center' }}>{message}</UITypography>
      </UIBox>
    </>
  );
}
export default Loader;
