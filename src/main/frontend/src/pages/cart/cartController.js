import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartView from './cartView';
import { initCart } from './store/cartAction';

const cartController = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initCart());
  }, []);

  const files = useSelector((state) => state.cart.files);

  // data from store
  const dashboardData = useSelector((state) => (state.dashboard
        && state.dashboard
    ? state.dashboard : {}));

  const { datatable } = dashboardData;

  // combine case properties with files.
  const transform = (accumulator, currentValue) => {
    const caseAttrs = {};
    Object.keys(currentValue).forEach((key) => {
      if (key && !Array.isArray(currentValue[key])) {
        caseAttrs[key] = currentValue[key];
      }
    });
    if (currentValue.files) {
      return accumulator.concat(currentValue.files.map((f) => ({ ...f, ...caseAttrs })));
    }
    return accumulator;
  };

  const fileData = datatable && datatable.data ? datatable.data.reduce(transform, []) : [];

  // ?????  Need to remove duplicated records?????
  //   // reduce duplicated records
  // const uniqueFiles = [];
  // const map = new Map();
  // tableData.forEach((item) => {
  //   if (!map.has(item.uuid)) {
  //     map.set(item.uuid, true); // set any value to Map
  //     result.push(item);
  //   }
  // });

  return (
    <CartView
      isLoading={dashboardData.isLoading}
      data={fileData.filter((d) => {
        if (files.includes(d.uuid)) {
          return true;
        }
        return false;
      })}
    />
  );
};

export default cartController;
