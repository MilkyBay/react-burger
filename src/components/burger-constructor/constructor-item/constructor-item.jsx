import PropTypes from "prop-types";
import { DragIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./constructor-item.module.css";
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { ingredientPropTypes } from "../../../utils/common-prop-types";
import { setMix } from "../../../services/slices";

const reorder = (arr, startIndex, endIndex) => {
    const [replaced] = arr.splice(startIndex, 1);
    arr.splice(endIndex, 0, replaced);
    return arr;
};

const ConstructorItems = ({ item, handleDelete, index }) => {
    const dispatch = useDispatch();
    const mix = useSelector((state) => state.data.mix);
    const [, dragRef] = useDrag({
        type: 'dnd',
        item: { id: item.sort_order },
    });
    const [{ is }, drop] = useDrop({
        accept: 'dnd',
        drop(dragObject) {
            let list = reorder(
                [...mix.sauces, ...mix.fillings].sort((a, b) => a.sort_order - b.sort_order),
                dragObject.id - 1,
                index
            );
            list = list.map((i, index) => {
                return { ...i, sort_order: index + 1 };
            });
            dispatch(
                setMix({
                    buns: mix.buns,
                    sauces: list.filter((item) => item.type === 'sauce'),
                    fillings: list.filter((item) => item.type === 'main'),
                })
            );
        },
        collect: (monitor) => ({
            is: monitor.isOver(),
        }),
    });

    return (
        <div ref={dragRef} className={styles.wrapper}>
            <div className={styles.element} ref={drop} style={{background: is ? '#1C1C21' : 'transparent'}}>
                <div style={{ width: "32px" }}>
                    <DragIcon type="primary" />
                </div>
                <div className={styles.infoContainer}>
                    <ConstructorElement
                        text={item.name}
                        price={item.price}
                        thumbnail={item.image}
                        handleClose={handleDelete(item)}
                    />
                </div>
            </div>
        </div>
    );
};

ConstructorItems.propTypes = {
    item: ingredientPropTypes.isRequired,
    handleDelete: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
};

export default ConstructorItems;
