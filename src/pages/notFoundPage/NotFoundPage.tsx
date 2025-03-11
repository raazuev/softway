import { useNavigate } from "react-router-dom";
import { Button } from "@/shared/ui/button/Button";
import styles from "./NotFoundPage.module.scss";
import { ROUTES } from "@/shared/constants/routes";

interface NotFoundProps {
  message?: string;
}

export const NotFoundPage = ({
  message = "Страница не найдена",
}: NotFoundProps) => {
  const mainNavigate = useNavigate();

  const handleMainPage = () => {
    mainNavigate(ROUTES.HOME);
  };

  return (
    <div className={styles.notFound}>
      <div className={styles.animInner}>
        <div className={styles.item}></div>
        <div className={styles.item}></div>
        <div className={styles.item}></div>
        <div className={styles.item}></div>
      </div>
      <div>
        <h2 className={styles.h2}>{message}</h2>
      </div>
      <div>
        <Button color="error" onClick={handleMainPage}>
          На главную
        </Button>
      </div>
    </div>
  );
};
