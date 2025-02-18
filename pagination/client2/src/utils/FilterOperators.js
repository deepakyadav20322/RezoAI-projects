const filterOperators = {
    equals: { label: "equals", value: "equals", sign: "=" },
    notEquals: { label: "not equals", value: "notEquals", sign: "<>" },
    greater: { label: "greater", value: "greater", sign: ">" },
    greaterOrEquals: { label: "greater or equals", value: "greaterOrEquals", sign: ">=" },
    less: { label: "less", value: "less", sign: "<" },
    lessOrEquals: { label: "less or equals", value: "lessOrEquals", sign: "<=" },
    like: { label: "like", value: "like", sign: "LIKE" },
    notLike: { label: "not like", value: "notLike", sign: "NOT LIKE" },
    in: { label: "in", value: "in", sign: "IN" },
    isNull: { label: "is null", value: "isNull", sign: "IS NULL" },
    isNotNull: { label: "is not null", value: "isNotNull", sign: "IS NOT NULL" },
  };
  
  // Use operators in the regex
  const operatorKeys = Object.keys(filterOperators).join("|");
  const regex = new RegExp(`(WHERE|AND|OR)\\s+([\\w]+)\\s+(${operatorKeys})\\s+'([^']+)'`, "g");
  
  const conditions = query.match(regex);
  
  for (const condition of conditions) {
    const [_, logic, column, operator, value] = condition.match(regex);
    
    switch (operator) {
      case filterOperators.equals.value:
        return rowValue === parsedValue;
      case filterOperators.notEquals.value:
        return rowValue !== parsedValue;
      case filterOperators.greater.value:
        return rowValue > parsedValue;
      case filterOperators.greaterOrEquals.value:
        return rowValue >= parsedValue;
      case filterOperators.less.value:
        return rowValue < parsedValue;
      case filterOperators.lessOrEquals.value:
        return rowValue <= parsedValue;
      case filterOperators.like.value:
        return typeof rowValue === 'string' && rowValue.includes(value);
      case filterOperators.notLike.value:
        return typeof rowValue === 'string' && !rowValue.includes(value);
      case filterOperators.in.value:
        return Array.isArray(rowValue) && rowValue.includes(parsedValue);
      case filterOperators.isNull.value:
        return rowValue === null;
      case filterOperators.isNotNull.value:
        return rowValue !== null;
      default:
        return true;
    }
  }
  
  // Use filterOperators for filter options
  const filterOptions = Object.values(filterOperators);
  