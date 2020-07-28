<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ArtTag;
use Illuminate\Support\Facades\DB;
class ArtTagController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $arttag= new ArtTag;
        return response()->json(['data'=> $arttag->all() , 'code' => 200]);
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
        $arttag= new ArtTag;
        $arttag->article_id = $request->input('article_id');  
        $arttag->tag_id = $request->input('tag_id');         
        $arttag->save();
        return response()->json(['data'=> 'success' , 'code' => 200]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $arttag = ArtTag::find($id);
        return response()->json(['data'=> $arttag , 'code' => 200]);
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
        $arttag = ArtTag::find($id);
        if($arttag){   
            $arttag->article_id = $request->input('article_id');  
            $arttag->tag_id = $request->input('tag_id');               
                $arttag->save();
                return response()->json([
                 'message'=>'Updated Successfully',
                 'code'=> 210
            ]);
         }else{
             return response()->json([
                 'message'=>'Error not found',
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
        $arttag = ArtTag::find($id);
        $arttag->delete();
        return response()->json(['data'=> 'deleted' , 'code' => 200]);
    }
}
