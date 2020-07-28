<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
// use DB;
use App\Http\Requests;
use App\Http\Controllers\Controller;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::resource('users', 'UserController');

Route::resource('articles', 'ArticleController');

Route::resource('categories', 'CategoryController');

Route::resource('tags', 'TagController');

Route::resource('roles', 'RoleController');

Route::resource('article_tag', 'ArtTagController');

// Route::match(['put', 'patch'], 'articles/{id}','ArticleController@Update');
Route::get('/image', function () {
    return file('thisimage.jpg')->store('public');
    // $users= DB::select('select * from users');   
    // echo($users);
    // print_r($users);
});

