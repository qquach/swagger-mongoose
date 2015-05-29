/**
 * New node file
 */
module.exports = {
    simple: {
      key:{
        type: "string"
      },
      value: {
        type: "string"
      }
    },
    anObject: {
      num: {
        type: "number"
      },
      date: {
        type: "date"
      }
    },
    test: {
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
        $ref: "#/definitions/anObject"
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
          $ref: "#/definitions/simple"
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
}