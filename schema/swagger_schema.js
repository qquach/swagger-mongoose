/**
 * New node file
 */
module.exports = {
    aNumber: {
      type: "number"
    },
    aString: {
      type: "string"
    },
    aBoolean: {
      type: "boolean"
    },
    anObject: {
      num: {
        type: "number"
      },
      date: {
        type: "date"
      }
    },
    aDate: {
      type: "date",
    },
    anArrayString: {
      type: "array",
      items: {
        type: "string"
      }
    },
    anArrayObject: {
      type: "array",
      items: {
        type: {
          key:{
            type: "string"
          },
          value: {
            type: "string"
          }
        }
      }
    },
    any1: {
      type: "array",
      items: "#undefined"
    },
    any2: {
      type: "array",
      items: "#undefined"
    },
    any3: {
      type: "array",
      items: "#undefined"
    },
    any4: {
      type: "array",
      items: "#undefined"
    }
}