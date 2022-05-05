import styles from "./ingredient-details.module.css";
import { ingredientPropTypes } from "../../../utils/common-prop-types";

const ingredientInfo = ["Калории,ккал", "Белки, г", "Жиры, г", "Углеводы, г"];

const IngredientsDetails = ({
  element: { name, image_large, calories, proteins, fat, carbohydrates },
}) => {
  const substancesValues = [calories, proteins, fat, carbohydrates];
  return (
    <>
      <img src={image_large} alt="ingredient_img" className="mb-4" />
      <p className="text text_type_main-medium mb-8">{name}</p>
      <div className={styles.info}>
        {substancesValues.map((i, index) => (
          <div key={i} className={styles.infoElement}>
            <p className="text text_type_main-small mb-2">
              {ingredientInfo[index]}
            </p>
            <p className="text text_type_digits-default">{i}</p>
          </div>
        ))}
      </div>
    </>
  );
};

IngredientsDetails.propTypes = {
  element: ingredientPropTypes.isRequired,
};

export default IngredientsDetails;
