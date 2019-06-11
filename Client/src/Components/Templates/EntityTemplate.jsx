import React from "react";

const EntityInfo = props => {
  const { name, email, address } = props.entity;

  return (
    <div>
      {name}
      <br />
      {address}
      <br />
      <a href={"mailto:{email}"}>{email}</a>
    </div>
  );
};

export default EntityInfo;
