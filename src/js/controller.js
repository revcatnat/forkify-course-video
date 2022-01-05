import * as model from './model.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';

//const recipeContainer = document.querySelector('.recipe');

if (module.hot) {
  module.hot.accept();
}

// https://forkify-api.herokuapp.com/v2

//////////////////////////////////////////////
/// 309
//////////////////////////////////////////////

/*
309
Part 1. How to write documentation for our code
Part 2. Possible challenges and improvements that you can do
*/

/*
Part 1. How to write documentation for our code

JSDocs: standard way of writing JS documentation
jsdoc.app, online guide

Sample: View.render
if type / then **, you'll see popup JSDoc, hit enter
it'll discover the parameters
    * Render the received object to the DOM
    line 1: simple description of the function

    notice all pars must have {} ,type of input accepted
    * @param {object|object[]} data
    ------ means accept object or array of objects, parname is data
    * @param {boolean} [render=true]
    --- [render=true], in [squareBracket] because its optional

    * @returns {undefined|string} 
    --- what View.render returns, undefined because it renders on html !return, or string if sencond par===false

    * @this {Object} View object's instance
    --- what this.kw in View.render refers to, in this case instance of children of View class, remember View is a parent class

    * @author Jonas Schmedtmann ,self-explanatory
    * @todo Finish implementation  ,what else needs to be done in this project
  
   * Render the received object to the DOM
   * @param {object|object[]} data -- The data to be rendered (e.g., a recipe)
   * @param {boolean} [render=true] -- If false, create markup str instead of rendering to the DOM
   * @returns {undefined|string} A markup str is returned if render is false
   * @this {Object} View object's instance
   * @author Jonas Schmedtmann
   * @todo Finish implementation
   
At this point, after adding above, if you hover func par, will show little description pop-up
*/

/*
Part 2. Possible challenges and improvements that you can do
Easy:
Display number of pages between pagination buttons 
Ingredients validation in view, e.g., send alert for wrong format before suBmission
Separate ingredient input, one field for qty,unit,desc for each ing entry
Allow >6 ingredients

Suggested Feature
Shopping list feature: on recipeView, button to add each of ings to a some kind of list, add another button in navbar to display what you've added to the shopping list
Weekly meal planning feature: Assign recipe for the next 7 days, and display on a weekly calendar. Maybe add drop down button to each recipe, then choose what day you want for that recipe to be added to
Get nutrition data from food API, spoonacular, calculate total calories in each recipe
*/

/*
310
Intro
This section, deploy Forkify project to a live-server, basically hosting the application on the internet so that people can access it
We'll do that with Netlify
Git-fundamental level: version control software, all profs use this
*/

/*
312-Simple Deployment with Netlify
dont get confused, 311 is not a video lecture

STEP 1. Final Build of the Project
First, need to run a final bundle of our app
--- package.json scripts:build
--- !use start because final built will have development server in it
------ also to compress the code and eliminate dead code

Start a fresh terminal
--- in your terminal, see right side, close all, then start fresh

Jonas delete .parcel-cache and dist folder
--- so only src and node_modules folder left

Back to package.json scripts:build
--- in build, you have to manually specify the destination, so modify
---   --dist-dir  means distribution directory
---   ./dist      name of destination folder to be created
      "scripts": {
        "start": "parcel index.html",
        "build": "parcel build index.html --dist-dir ./dist" <<notice here
      },
--- notes, if use parcel v1, --out-dir, jonas start at 4:00, we're fine though

Add default 
--- parcel somehow wont run main, so change to default, parcel's bug maybe
--- under description 
    "default":"index.html",

npm run build
--- dont forget you have to be in the same folder as package.json
--- in our case, starter folder
*/

/*
STEP 2. Using Netlify

netlify.com
--- free if only front-end (HTML,CSS,JS,some images)
--- !include server-side code at all

surge.sh
--- also front-end only
--- account opening !needed
--- npm install --global surge
--- when you wanna deploy, surge   ,yes just that

Back to netlify
--- login > click sites on top bar
--- drag+drop the dist folder that you've built
--- you get link, https://compassionate-nobel-421f10.netlify.app
--- click site settings > change site name
--- now you get https://forkify-neilver.netlify.app/
------ note, change to forkify-neilver2.netlify.app  ,due to fracty change

Advantages
--- Your page is now secured with SSL certificate, see the padlock icon
------ also https
--- CDN:Content Delivery Network, our content lives in many server around the world instead of just 1
------ User try to access > diverted to server closest to them
------ Speed up the delivery time of your application

Drag+drop like above is called manual deployment
There's an automatic way, called version control and git, next course
*/

/*
313 - Setting up Git and GitHub

Install+Setup Git in our PC
Open a free account at github.com

Website address: https://git-scm.com/
Basically to save snapshot of your code over time
--- can go back in time to ur app's older-version if you made a mistake
--- download+install

Start a repository
--- new clean terminal
--- again, ensure in the correct folder, same as package.json()
--- type    git init
--- with this, we created a local repository which eventually will contain all of our codes
--- in Jonas screen, all files turn orange, not mine, note this taken care of on the evening 😉
--- also for some reason, .git folder is hidden

Github.com
--- theres also gitlab/gitbucket but jonas use github
--- to store or have local repository/repo in the cloud
--- save repo online so you can work outside your laptop, also never lost your file
--- open free account

Connect local git with your github acc
--- choose global, so it'll work in all the repo you've created in your computer
--- command line, git config --global user.name "revcatnat"
--- git config --global user.email "revnathalia@gmail.com"

notice, jonas said all prof developers uses Git and GitHub every single day
Git: the software
GitHub: the repo storing place
*/

/*
314-Git Fundamentals

.gitignore
--- located in the same folder as package.json
--- inside, folders/files which we want Git to ignore, dont want those to be in our repositories
------ e.g., node-modules/external library, can always get it back via npm, also too big
------ dist, contains the compiled/processed code. Ideally, git only contains original source code. Jonas put dist in .gitignore

notice it seems like you have to keep pressing + stage all changes, not automatic 

tracking files/add to staging area
--- type   git add -A
--- -A for all
--- notes you got a warning LF will be replaced by CRLF, this is because Windows diff to Linux/Mac, !worry about it
------ see here https://stackoverflow.com/questions/5834014/

when changes happens, icons now M aka modified
--- vscode also shown green bar on the left, that where the changes are
--- that green bar is clickable, clicked=show the changes

type git status
--- see committed/not staged commit files
---  committed=tracked
--- not staged for commit=recent modified

to commit all, retype git add -A 
--- now all green bars are gone

*/

const controlRecipes = async function () {
  try {
    // app logic
    const id = window.location.hash.slice(1);
    if (!id) return;

    // spinner === view
    recipeView.renderSpinner();

    //update resultView to mark selected search results on results section
    resultsView.update(model.getSearchResultsPage());

    // update bookmarks, highlight
    bookmarksView.update(model.state.bookmarks);

    // loading === model, just to move the data to state.recipe
    await model.loadRecipe(id);
    //const { recipe } = model.state;

    // render === view
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // Get search query+clear search field
    const query = searchView.getQuery();
    if (!query) return;

    // Add to model.state.search ,load
    await model.loadSearchResults(query);

    // Render search result
    resultsView.render(model.getSearchResultsPage());

    // Render pagination
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // Render search result
  resultsView.render(model.getSearchResultsPage(goToPage));

  // Render pagination
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update recipe servings in model.state.recipe (backend)
  model.updateServings(newServings);

  // Update the recipe view (frontend)
  //recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1. Add/Remove a bookmark
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }

  // 2. Update recipeView
  recipeView.update(model.state.recipe);
  //console.log(model.state.recipe);

  // 3. Render Bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  //console.log(newRecipe);
  try {
    addRecipeView.renderSpinner();

    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    recipeView.render(model.state.recipe);

    addRecipeView.renderMessage();

    bookmarksView.render(model.state.bookmarks);

    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
