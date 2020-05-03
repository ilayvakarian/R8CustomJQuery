import turtle

# Screen game
win = turtle.Screen()
win.title("Pin - pong")
win.bgcolor("black")
win.setup(width=800, height=600)
win.tracer(1,4)

# Racket

# Racket first
racket_a = turtle.Turtle()
racket_a.speed(0)
racket_a.shape("square")
racket_a.color("green")
racket_a.shapesize(stretch_len=1,stretch_wid=3 )
racket_a.penup()
racket_a.goto(-350,0)

# Racket second
racket_b = turtle.Turtle()
racket_b.speed(0)
racket_b.shape("square")
racket_b.color("purple")
racket_b.shapesize(stretch_len=1,stretch_wid=3 )
racket_b.penup()
racket_b.goto(350,0)

# ball
ball = turtle.Turtle()
ball.speed(0)
ball.shape("circle")
ball.color("white")
ball.penup()
ball.goto(0,0)
ball.dx = 2
ball.dy = 2

# Title of score

pen = turtle.Turtle()
pen.speed(0)
pen.shape("square")
pen.color("red")
pen.hideturtle()
pen.penup()
pen.goto(0,260)
pen.clear()
pen.write("Player A : 0 || Player B : 0",align="center",font=("TimesNewRoman",22,"normal"))
score_a = 0
score_b = 0

# function move Rackets(first,second)

# move Racket first
def racket_a_up():
	y = racket_a.ycor()
	if racket_a.ycor() < 260:
		y += 20
	racket_a.sety(y)

def racket_a_down():
	y = racket_a.ycor()
	if racket_a.ycor() > -260:
		y -=20
	racket_a.sety(y)

# move Racket second
def racket_b_up():
	y = racket_b.ycor()
	if racket_b.ycor() < 260:
		y +=20
	racket_b.sety(y)

def racket_b_down():
	y = racket_b.ycor()
	if racket_b.ycor() > -260:
		y -=20
	racket_b.sety(y)


# keyboard bind

win.listen()

win.onkeypress(racket_a_up,'w')
win.onkeypress(racket_a_down,'s')

win.onkeypress(racket_b_up,'Up')
win.onkeypress(racket_b_down,'Down')



while True:
	win.update()
	# Move of ball

	ball.setx(ball.xcor() + ball.dx)
	ball.sety(ball.ycor() + ball.dy)

	if ball.ycor() > 285:
		ball.sety(285)
		ball.dy *= -1

	if ball.ycor() < -285:
		ball.sety(-285)
		ball.dy *= -1

	if ball.xcor() > 390:
		ball.goto(0,0)
		# Assign a direction ( + - in side who scored ; - - in side who get score )
		ball.dx *= 1
		score_a += 1
		pen.clear()
		pen.write("Player A : {} || Player B : {}".format(score_a,score_b),align="center",font=("TimesNewRoman",22,"normal"))


	if ball.xcor() < -390:
		ball.goto(0,0)
		ball.dx *= 1
		score_b += 1
		pen.clear()
		pen.write("Player A : {} || Player B : {}".format(score_a, score_b), align="center",
				  font=("TimesNewRoman", 22, "normal"))


	# Repulse the ball of racket_b
	if ball.xcor() > 325 and ball.ycor() < racket_b.ycor() + 30 and ball.ycor() > racket_b.ycor() - 30:
		ball.dx*=-1

	# Repulse the ball of racket_a
	if ball.xcor() < -325 and ball.ycor() < racket_a.ycor() + 30 and ball.ycor() > racket_a.ycor() - 30:
		ball.dx*=-1

