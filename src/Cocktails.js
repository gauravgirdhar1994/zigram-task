import React, { Component } from "react";
import { Button, Card, Col, Row, Container } from "react-bootstrap";
import axios from "axios";
import "./App.css";

export default class Cocktails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedcocktail: 1,
      searchLetter: "a",
      filterType: "",
      filters: [],
    };

    this.searchDrink = this.searchDrink.bind(this);
    this.filterDrink = this.filterDrink.bind(this);
  }

  //function which is called the first time the component loads
  componentDidMount() {
    this.getCocktailData("search");
    this.getFilters();
  }

  //Function to get the different filters to be used to filter the data
  async getFilters() {
    let filters = ["c", "g", "i", "a"];
    let filterArr = [];
    filters.map(async (ele) => {
      const response = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/list.php?${ele}=list`
      );

      this.setState({
        filters: {
          ...this.state.filters,
          [ele]: response.data.drinks,
        },
      });
    });
  }

  //Function to search the data by alphabet
  searchDrink = (e) => {

    if (e) {
      this.setState(
        {
          searchLetter: e,
        },
        () => {
          this.getCocktailData("search");
        }
      );
    } else {
      this.setState(
        {
          searchLetter: "a",
        },
        () => {
          this.getCocktailData("search");
        }
      );
    }
  };

  //Function to filter the drinks on the basis of different filters
  filterDrink = (e, type) => {

    if (e.target.value) {
      this.setState(
        {
          searchLetter: e.target.value,
          filterType: e.target.name,
        },
        () => {
          this.getCocktailData("filter");
        }
      );
    } else {
      this.setState(
        {
          searchLetter: "a",
          filterType: "",
        },
        () => {
          this.getCocktailData("filter");
        }
      );
    }
  };

  //Function to get the cocktail Data from api
  getCocktailData(type) {
    let url = "";
    if (type === "search") {
      url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${this.state.searchLetter}`;
    } else {
      url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?${this.state.filterType}=${this.state.searchLetter}`;
    }
    axios.get(url).then((response) => {

      this.setState({ cocktailList: response.data });
    });
  }

  //Function to capitalize the word
  ucword = (str) => {
    if (str) {
      str = str
        .toLowerCase()
        .replace(
          /(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g,
          function (replace_latter) {
            return replace_latter.toUpperCase();
          }
        ); //Can use also /\b[a-z]/g
    }
    return str; //First letter capital in each word
  };

  
  render() {
    const alphabets = "abcdefghijklmnopqrstuvwxyz";
    let alphabetsArr = [];

    for (var indx in alphabets) {
      alphabetsArr.push(alphabets[indx]);
    }

    if (!this.state.cocktailList) return <p>Loading data</p>;
    return (
      <Container>
        <Row>
          <Col lg="4">
            <label className="mt-4">Search Drink by Letter</label>
            {alphabetsArr.map((object, i) => {
              return (
                <a
                  className="al-search"
                  onClick={() => this.searchDrink(object)}
                >
                  {this.ucword(object)}
                </a>
              );
            })}
            
            {this.state.filters && this.state.filters["i"] ? (
              <>
                <hr></hr>
                <label className="mt-3 text-left">
                  Filter Drink by Ingredients :
                </label>
                <select
                  className="form-control"
                  name="i"
                  onClick={(e) => this.filterDrink(e)}
                >
                  {this.state.filters["i"].map((ele) => {
                    return (
                      <option value={ele.strIngredient1}>
                        {ele.strIngredient1}
                      </option>
                    );
                  })}
                </select>
              </>
            ) : (
              ""
            )}
            {this.state.filters && this.state.filters["c"] ? (
              <>
                <hr></hr>
                <label className="mt-3 text-left">
                  Filter Drink by Category :
                </label>
                <select
                  className="form-control"
                  name="c"
                  onClick={(e) => this.filterDrink(e)}
                >
                  {this.state.filters["c"].map((ele) => {
                    return (
                      <option value={ele.strCategory}>{ele.strCategory}</option>
                    );
                  })}
                </select>
              </>
            ) : (
              ""
            )}
            {this.state.filters && this.state.filters["g"] ? (
              <>
                <hr></hr>
                <label className="mt-3 text-left">
                  Filter Drink by Glass :
                </label>
                <select
                  className="form-control"
                  name="g"
                  onClick={(e) => this.filterDrink(e)}
                >
                  {this.state.filters["g"].map((ele) => {
                    return <option value={ele.strGlass}>{ele.strGlass}</option>;
                  })}
                </select>
              </>
            ) : (
              ""
            )}
            {this.state.filters && this.state.filters["a"] ? (
              <>
                <hr></hr>
                <label className="mt-3 text-left">
                  Filter Drink by Alcoholic :
                </label>
                <select
                  className="form-control"
                  name="a"
                  onClick={(e) => this.filterDrink(e)}
                >
                  {this.state.filters["a"].map((ele) => {
                    return (
                      <option value={ele.strAlcoholic}>
                        {ele.strAlcoholic}
                      </option>
                    );
                  })}
                </select>
              </>
            ) : (
              ""
            )}
          </Col>
          <Col lg="8">
            <Row>
              {this.state.cocktailList.drinks.map((cocktail) => (
                <Col lg="4" key={cocktail.strDrink}>
                  <Card className="ml-2 mt-4">
                    <Card.Img
                      variant="top"
                      style={{ width: "100px", height: "100px" }}
                      src={cocktail.strDrinkThumb}
                      className="mx-auto py-2"
                    />
                    <Card.Body>
                      <Card.Title>{cocktail.strDrink}</Card.Title>
                      <Card.Text>
                        <p>
                          Category :{" "}
                          {cocktail.strCategory ? cocktail.strCategory : ""}
                        </p>
                        <p>
                          Ingredients :{" "}
                          {cocktail.strIngredient1
                            ? cocktail.strIngredient1 + ","
                            : ""}
                          {cocktail.strIngredient2
                            ? cocktail.strIngredient2 + ","
                            : ""}
                          {cocktail.strIngredient3
                            ? cocktail.strIngredient3 + ","
                            : ""}
                          {cocktail.strIngredient4
                            ? cocktail.strIngredient4 + ","
                            : ""}
                        </p>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}
