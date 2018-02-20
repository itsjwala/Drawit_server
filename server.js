var http=require('http');
var express=require('express');

var port=process.env.PORT || 9999;

var app=express();

var server=app.listen(port,()=>{

 console.log(`server listening on port ${port}`);

})

var io=require('socket.io')(server);

io.on('connection',(socket)=>{
	console.log(`new user connected : ${socket.id}`);



	socket.on('clearCanvas',() => socket.broadcast.emit('clearCanvas'))
	socket.on('erase',() => socket.broadcast.emit('erase'))

	socket.on('colorChange',color=>{
		//broadcast to everyone except the user who emitted it
		socket.broadcast.emit('colorChange',color);
		//broadcast to everyone
		// io.emit('colorChange',color)
	})

	socket.on('changeBrush',brushSize=>	socket.broadcast.emit('changeBrush',brushSize) )


	socket.on('disconnect',()=>console.log(`User ${socket.id} disconnected`));

})


app.use(express.static('public'))
