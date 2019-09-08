import React from "react";

const Description = props => {
  const { language,description } = props;
  
  const correctLan = description.find(desc=>desc.language === language);

  return <p className="box">{correctLan.text}</p>;
};

Description.defaultProps = {
  language: "en"
};
export default Description;
