const country = {
  name: "KOREA",
  population: 50000000,
  gdp: 30000,
  cities: {
    seoul: 10000000,
    busan: 4000000,
  },
  getName: function () {
    return this.name;
  },
};
console.log(country);
console.log(country.name);
console.log(country.population);
console.log(country.gdp);
console.log(country.getName());
console.log(country["name"]);
console.log(country["population"]);
console.log(country.cities.seoul);
console.log(country["cities"].seoul);
console.log(country["cities"]["seoul"]);
