"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Add column to Questions
    return queryInterface.addColumn("Questions", "tags", {
      type: Sequelize.ENUM(
        "Diabetes",
        "Rare Diseases",
        "Athletes Diseases",
        "Hypertension"
      ),
      allowNull: false,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn("Questions", "tags");
  },
};
