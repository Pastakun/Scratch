from PIL import Image

def save_color_codes(image_path, output_file):
    # 画像を開く
    image = Image.open(image_path)

    # 画像のサイズを取得
    width, height = image.size

    # カラーコードを保存するファイルを開く
    with open(output_file, 'w') as file:
        # 画像の各ピクセルに対してループ
        for y in range(height):
            for x in range(width):
                # ピクセルのカラーコードを取得 (R, G, B)
                pixel_color = image.getpixel((x, y))

                # RGBを10進数に変換してファイルに書き込む
                decimal_color = pixel_color[0] * 65536 + pixel_color[1] * 256 + pixel_color[2]
                file.write("{}\n".format(decimal_color))

    print("R * 65536 + G * 256 + B 形式のカラーコードをファイルに保存しました。")

# 画像ファイルのパスと出力ファイル名を指定
image_path = "./image.png"
output_file = "output.txt"

# カラーコードを保存する関数を呼び出す
save_color_codes(image_path, output_file)
