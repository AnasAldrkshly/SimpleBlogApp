<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Article;
use App\ArtTag;
use Illuminate\Support\Facades\DB;



class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $article = new Article;
        return response()->json(['data'=> $article->all() , 'code' => 200]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $article = new Article;
        $arttag = new ArtTag;
        $article->title = $request->input('title');
        $article->content = $request->input('content');
        // $article->title = $request->input('image');
        $article->cat_id = $request->input('cat_id');
        $article->tag_id = $request->input('tag_id');
        $article->created_user_id = $request->input('created_user_id');
        $article->save();

        $arttag->article_id = $article->id;
        $arttag->tag_id = $request->input('tag_id');
        $arttag->save();
        return response()->json(['data'=> 'success' , 'code' => 200,'id' => $article->id]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $article = Article::find($id);
        return response()->json(['data'=> $article , 'code' => 200]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $article = Article::find($id);
        if($article){   
              $article->title = $request->input('title');
              $article->content = $request->input('content');
            //   $article->image = $request->input('image');
              $article->cat_id = $request->input('cat_id');
              $article->tag_id =$request->input('tag_id');
              $article->save();
             return response()->json([
                 'message'=>'Article Updated Successfully',
                 'code'=> 210
             ]);
         }else{
             return response()->json([
                'message'=>'Article not found',
                 'code'=> 201
            ]);
         } 
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $article = Article::find($id);
        $article->delete();
        return response()->json(['data'=> 'deleted' , 'code' => 200]);
    }
}
