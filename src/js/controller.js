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

committing the files
--- git add -A is a pre-set before the commit === staging
--- commit: taking snapshot of your code at a certain point in time
------ do it before you make significant changes to your code
--- type git commit -m "Initial commit"
------ -m === message
------ "Initial commit" === typical message for 1st commit
------ after that you can just adjust, e.g., "new search algorithm"
--- notice jonas use 'apostrophe' , but because you use windows, always use "quotemarks"
--- after this, letter status(A) beside filenames are gone, not M though

double-check status
--- after above, if nothing is modified and you type git status, it'll says nothing to commit,working tree clean

To summarised the steps:
git init
git add -A
git commit -m 'whatever messages'

Side orders:
git status
*/

/*
When you modified but it's resulted in bugs
--- to simulate, type console.log(BUG) ,thats not a var so will be resulted in an error
--- type git reset --hard HEAD
------ notice this will delete NOT only a single line but TAKES U BACK TO PREVIOUS commit.
--- console.log(BUG) is gone now, letter status has gone
--- but you're still typing here so back to M/modified again 😅

Say your error is placed on the few previous commits, and wanna go back to that few previous commit (hopping the last commit)
--- first take a look at commit log
------ type git log
------ will show previous, :...skipping... then from newest to oldest INCLUDING --hard HEAD
commit 528450c86ebf6e6b7d62a03785be5af4d7ef4999 (HEAD -> master) << notice last commit shown first
Author: revcatnat <revnathalia@gmail.com>
Date: Wed Jan 5 09:51:54 2022 +0000
second

        :...skipping...
        commit 528450c86ebf6e6b7d62a03785be5af4d7ef4999 (HEAD -> master) << same like below
        commit 528450c86ebf6e6b7d62a03785be5af4d7ef4999 (HEAD -> master) << notice first hard head, deleting console.log(BUG)
        commit 528450c86ebf6e6b7d62a03785be5af4d7ef4999 (HEAD -> master) << notice second commit
        Author: revcatnat <revnathalia@gmail.com>
        Date:   Wed Jan 5 09:51:54 2022 +0000

            second

        commit deec4878f3aeed1ef691e8298af6c657350da42c   << notice oldest, first commit, look at the id
        Author: revcatnat <revnathalia@gmail.com>
        Date:   Wed Jan 5 09:44:12 2022 +0000

            Initial commit

--- in this case wanting to go back to Initial commit, hence skipping second
------ first type q to quit the log
------ then type git reset hard commitIdThatYouWannaGoBackTo
------ Initial commit, so type git reset --hard deec4878f3aeed1ef691e8298af6c657350da42c
--- success message: HEAD is now at deec487 Initial commit
--- now your notes is shorter, only until ln.220 because thats the point of Initial commit

Moving between commit is dangerous, so when u plan a lot of changes, create a new branch 
--- type  git branch  ,see the list of branch that we currently have
------   * master   ,at this point only 1 branch which is the master
--- create a new branch===copy of the master code, we can add into it without affecting the master branch
--- perfect if your old code working just fine, but you want to add, so if bug happens, can go back to working code
------ type   git branch whatever-branch-name
------ i did git branch new-feature
--- type git branch, now you see two, master and new-feature, green font with asterisk is the one you're currently in
--- move to the new branch, currently you've created a new one but you're still in master
------ type git checkout branchNameYouWannaGoTo
------ i did   git checkout new-feature
------ success message    Switched to branch 'new-feature'     
                          M       src/js/controller.js        <<this is because you keep typing on controller.js
------ notes orange/red bar means somethings been deleted, if you click on it, red highlight:deleted, green:new addition
--- now add simple random function below
--- now do git add and git commit again
------ those additions are now in new-feature branch but not in master

switch back to master to integrate changes in new-feature to our original/main code base
--- say you successfully add new algor to the new branch and now wanna copy to the original one
--- first, move back to master, remember you're still in new-feature branch
------ git checkout master
------ err : Please commit your changes or stash them before you switch branches ,bcos u keep typing on controller.js😑
*/

const newFeature = function () {
  console.log('new feature');
};

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
