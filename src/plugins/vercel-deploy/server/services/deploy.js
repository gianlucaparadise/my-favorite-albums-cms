"use strict";

module.exports = ({ strapi }) => ({
  getContentTypes() {
    const contentTypes = strapi.contentTypes;
    const keys = Object.keys(contentTypes);
    let collectionTypes = [];
    let singleTypes = [];

    keys.forEach((name) => {
      if (name.includes("api::")) {
        const object = {
          uid: contentTypes[name].uid,
          kind: contentTypes[name].kind,
          globalId: contentTypes[name].globalId,
          attributes: contentTypes[name].attributes,
        };
        if (contentTypes[name].kind === "collectionType") {
          collectionTypes.push(object);
        } else {
          singleTypes.push(object);
        }
      }
    });

    return { collectionTypes, singleTypes } || null;
  },
});
