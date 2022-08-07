import PropTypes from "prop-types";

export const statePropTypes = PropTypes.shape({
  burgerIngredients: PropTypes.array.isRequired,
  orderedIngredients: PropTypes.array.isRequired,
  loading: PropTypes.bool,
});

export const ingredientPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  __v: PropTypes.number.isRequired,
});

// export const ingredientsBlockPropTypes = PropTypes.shape({
//   data: PropTypes.arrayOf(ingredientPropTypes),
//   key: PropTypes.string,
//   ref: PropTypes.any,
//   title: PropTypes.string,
// });
