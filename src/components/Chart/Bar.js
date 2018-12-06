import React from "react";

export default ({ priceY, priceUSD, handlePriceDisplay, date }) => {
  return (
    <div
      onClick={() => handlePriceDisplay(priceUSD, date)}
      className="bar split-vertical"
      key={priceY}
      style={{
        height: `${priceY * 2.55}px`
      }}
    >
      <div className="price-usd">{priceUSD}</div>
    </div>
  );
};
