using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;

namespace TIFF2JPEG
{
    internal class Program
    {
        static void Main(string[] args)
        {
            if (args.Length == 0)
            {
                Console.WriteLine("使い方:> TIFF2JPEG [変換対象フォルダ]");
                Environment.Exit(1);
            }
            else
            {
                string folderPath = args[0];
                if (Directory.Exists(folderPath))
                {
                    int count = 0;
                    string[] files = Directory.GetFiles(folderPath, "*.tif");
                    foreach (string tiffPath in files)
                    {
                        string jpegPath = tiffPath.Replace(".tif", ".jpg");
                        if (!File.Exists(jpegPath))
                        {
                            using (Image image = Image.FromFile(tiffPath))
                            {
                                image.Save(jpegPath, ImageFormat.Jpeg);
                                count++;
                            }
                        }
                    }
                    Console.WriteLine($"{count}件を変換しました．");
                    Environment.Exit(0);
                }
                else
                {
                    Console.WriteLine("指定されたフォルダは存在しません．");
                    Environment.Exit(1);
                }
            }
        }
    }
}
