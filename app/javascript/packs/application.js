// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"
import "channels"
import $ from 'jquery';


require("jquery")

Rails.start()
Turbolinks.start()
ActiveStorage.start()

import "controllers"
import "bootstrap"

const catBreeds = ["abyssinian", "aegean", "american bobtail", "american curl", "american shorthair", "american wirehair", "arabian mau", "australian mist", "balinese", "bambino", "bengal", "birman", "bombay", "british longhair", "british shorthair", "burmese", "burmilla", "california spangled", "chantilly-tiffany", "chartreux", "chausie", "cheetoh", "colorpoint shorthair", "cornish rex", "cymric", "cyprus", "devon rex", "donskoy", "dragon li", "egyptian mau", "exotic shorthair", "havana brown", "himalayan", "japanese bobtail", "javanese", "khao manee", "korat", "kurilian", "laperm", "maine coon", "malayan", "manx", "munchkin", "nebelung", "norwegian forest cat", "ocicat", "oriental", "persian", "pixie-bob", "ragamuffin", "ragdoll", "russian blue", "savannah", "scottish fold", "selkirk rex", "siamese", "siberian", "singapura", "snowshoe", "somali", "sphynx", "tonkinese", "toyger", "turkish angora", "turkish van", "york chocolate"]

const name = $(".name .stylize")
const origin = $(".origin .stylize")
const life_span = $(".life_span .stylize")
const descP = $(".descP .stylizeP")
const info = $(".info")
const profile = $(".profile")
const child = $(".child .stylize")
const affection = $(".affection .stylize")
const stranger = $(".stranger .stylize")
const intel = $(".intel .stylize")
const energy = $(".energy .stylize")

const starRating = (rating) => {
  return `${`★`.repeat(rating)}${`☆`.repeat(5-rating)}`
}


const catFetch = async (cat) => {
  const url = `https://api.thecatapi.com/v1/breeds/search?q=${cat}`
  await fetch(url, {
    method: "GET",
    headers: {
      "x-api-key": "d4444680-73e4-4960-8552-69d64520f48b"
    }
  })
  .then(response => {
    if (response.ok) {
      response.json().then(data => {
        name.text(data[0].name); // cat name
        origin.text(data[0].origin); // cat origin
        life_span.text(data[0].life_span); // cat life span
        descP.text(data[0].description); // cat description
        child.text(`${starRating(data[0].child_friendly)}`); // cat child friendly
        affection.text(`${starRating(data[0].affection_level)}`); // cat affection
        stranger.text(`${starRating(data[0].stranger_friendly)}`); // cat stranger friendly
        intel.text(`${starRating(data[0].intelligence)}`); // cat intelligence
        energy.text(`${starRating(data[0].energy_level)}`); // cat energy level
        info.attr('href', `${data[0].wikipedia_url}`); // cat wikipedia url
        return fetch(`https://api.thecatapi.com/v1/images/${data[0].reference_image_id}`)
      }).then(response => response.json()).then(data => {
        profile.attr('src', `${data.url}`) // cat image url
      })
    }
  })
}



window.onload = () => {
  catFetch(catBreeds[Math.floor(Math.random() * catBreeds.length)])
};

$(".random").on( "click", function() {
  catFetch(catBreeds[Math.floor(Math.random() * catBreeds.length)])
}
)

$("input").on("keyup", function(event) {
  const filtered = catBreeds.filter(cat => cat.includes(event.target.value.toLowerCase()))
  console.log(filtered)
}
)