(*  on_tick関数 *)
let move_airplane_on_tick {airplane_zahyou = airplane_zahyou; sun_zahyou = sun_zahyou; lop = lop; airplane_houkou = airplane_houkou} =
  f airplane_zahyou;;
let move_on_tick {airplane_zahyou = airplane_zahyou; sun_zahyou = sun_zahyou; lop = lop; airplane_houkou = airplane_houkou} =
  {airplane_zahyou = move_airplane_on_tick {airplane_zahyou = airplane_zahyou; sun_zahyou = sun_zahyou; lop = lop; airplane_houkou = airplane_houkou}; sun_zahyou = sun_zahyou; lop = move_airplane_on_tick {airplane_zahyou = airplane_zahyou; sun_zahyou = sun_zahyou; lop = lop; airplane_houkou = airplane_houkou} :: lop; airplane_houkou = airplane_houkou};;

(*         終了条件（点D上に飛行機が置かれるor外) *)
let on_D {airplane_zahyou = (airplane_x, airplane_y); sun_zahyou = sun_zahyou; lop = lop; airplane_houkou = airplane_houkou} =
  airplane_x >= 0 && airplane_y >= 0;;

(*         終了画面 *)
let draw_last {airplane_zahyou = (airplane_x, airplane_y); sun_zahyou = sun_zahyou; lop = lop; airplane_houkou = airplane_houkou} =
  if airplane_x = 1000 && airplane_y = 300 then place_image2 (text "GAME CLEAR!!" 50 Color.white) (width / 2, height / 2) (place_image2 (rectangle width height (make_color 204 204 204 ~alpha:100)) (width / 2, height / 2) (draw {airplane_zahyou = (airplane_x, airplane_y); sun_zahyou = sun_zahyou; lop = lop; airplane_houkou = airplane_houkou}))
  else place_image2 (text "GAME OVER..." 50 Color.white) (width / 2, height / 2) (place_image2 (rectangle width height (make_color 204 204 204 ~alpha:100)) (width / 2, height / 2) (draw {airplane_zahyou = (airplane_x, airplane_y); sun_zahyou = sun_zahyou; lop = lop; airplane_houkou = airplane_houkou}));;
;; big_bang {airplane_zahyou = initial_airplane_zahyou; sun_zahyou = initial_sun_zahyou; lop = initial_lop; airplane_houkou = (dx, dy)}
  ~name:"Risa's game"
  ~width:width
  ~height:height
  ~to_draw:draw
  ~on_tick:move_on_tick
  ~rate:100
  ~stop_when:on_D
  ~to_draw_last:draw_last
  ~onload:false;;
