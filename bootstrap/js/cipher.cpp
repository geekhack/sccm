#include <iostream>
#include <string.h>
#include <time.h>
using namespace std;

class Encrypt
{
public:
  string toEncrypt;
  static string encrypted;
  string deencrypted;
  char dato[26];


  //int getPhrase(){ return toEncrypt; }
  //void setPhrase(string toEncrypt);
  string cipher(string toEncrypt);
  string decrypt(string encrypted);
  //Encrypt(string toEncrypt, string encrypted, string deencrypted);
  //~Encrypt();
  //Encrypt();

};

string Encrypt::cipher(string toEncrypt)
{
  srand((unsigned int)time(NULL));
  int asciiValue = 97, randomValue, count;

  for (count = 0; count < 26; count++)
  {
    dato[count] = asciiValue;
    asciiValue++;
  }

  int length = (int)toEncrypt.length();

  for (count = 0; count < length; count++)
  {
    for (int i = 0; i < 26; i++)
    {
      if (toEncrypt[count] == dato[i])
      {
        randomValue = rand() % 6;
        toEncrypt[count] += randomValue;
        if (toEncrypt[count] > 122)       
          toEncrypt[count] = 123 - randomValue;
      }
    }
  }
  encrypted = toEncrypt;
  cout << encrypted << endl;
  return encrypted;
}

string Encrypt::decrypt(string encrypted)
{
  int length = (int)encrypted.length();

  for (int count = 0; count < length; count++)
  {
    for (int i = 0; i < 26; i++)
    {
       if (encrypted[count] == dato[i])
      {
        encrypted[count] = dato[i];

      }
    }
  }

  deencrypted = encrypted;
  cout << deencrypted << endl;


  return deencrypted;

}