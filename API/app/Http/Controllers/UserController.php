<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Hash;

class UserController extends Controller
{
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = new User;
        return response()->json(['data'=> $users->all() , 'code' => 200]);
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
        //name    email   password    type
    public function store(Request $request)
    {
        $email = $request->input('email');
        $exists = DB::Table('users')->where('email', $email)->first();
        if ($exists == null) {
            $user = new User;
            $user->username = $request->input('username');
            $user->role_id = $request->input('role_id');
            $user->email = $request->input('email');
            $user->password = Hash::make($request->input('password'));            
            $user->save();
            return response()->json([
                'message'=>'User Saved Successfully',
                'code'=> 210
            ]);
        }else{
            return response()->json([
                'message'=>'User is already exists',
                'code'=> 201
            ]);
        }       
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        return response()->json(['data'=> $user , 'code' => 200]);

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
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
    public function update(Request $request,  $id)
    {

          $user = User::find($id);
        if($user){   
              $user->username = $request->input('username');
              $user->role_id = $request->input('role_id');
              $user->email = $request->input('email');
              $user->password = Hash::make($request->input('password'));   
              $user->save();
             return response()->json([
                 'message'=>'User Updated Successfully',
                 'code'=> 210
             ]);
         }else{
             return response()->json([
                'message'=>'User not found',
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
    public function destroy(User $user)
    {
        $user->delete();
        return response()->json(['data'=> 'deleted' , 'code' => 200]);
    }

    public function updatepass(Request $request, $id ){
        $oldPassword = $request->input('Oldpassword');
        $password = $request->input('password');
        $user = new User;
        $Data = $user::find($id);
        if ($Data) {
            if ( Hash::check($oldPassword, $Data->password)){
                $Data->password = Hash::make($password);
                $Data->save();
            }else{
                return response()->json([
                    'message'=>"Wrong Old Password Entered",
                    'code'=> 203
                ]);
            }
        }else{
            return response()->json([
                'message'=>"This User Is Not Exists Any More!!",
                'code'=> 202
            ]);
        }
        return response()->json([
            'message'=>'User\'s Password Has Been Updated.',
            'code'=> 210
            ]);
    }

}
