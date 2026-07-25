// import java.util.*;
// class Main{
    
//     public static void main(String args[]){
//         Scanner ss=new Scanner(System.in);
//         System.out.println("Enter number of array");
//         int n=ss.nextInt();
//         int[] arr= new int[n];
//         System.out.println("enter the elements");
//         for(int i=0;i<n;i++){
//             arr[i]=ss.nextInt();
//         }
//         for(int i=0;i<n;i++){
//            System.out.println(arr[i]);
//         }
//         for(int i=arr.length-1;i>=0;i--)
//         System.out.println(arr[i3
//         ]);
//     }
// }

// import java.util.*;
// class Main{
//     public static void main(String args[]){
//         String s="arun";
//         for(int i=s.length()-1;i>=0;i--){
//             System.out.print(s.charAt(i));
//         }
//     }
// }


// import java.util.*;

// class Animal {
//     void sound() {
//         System.out.println("Animal makes a sound");
//     }
//     void sound(int a, int b){
//         System.out.println("lkjfsd");
//     }
// }



// class Main {
//     public static void main(String[] args) {
//         Animal a = new Animal(); // Upcasting
//         a.sound(); // Dog barks
//         a.sound(4,3);
//     }
// }


// import java.util.*;
// class Main{
//     public static void main (String args[]){
//     HashMap<Integer, String> list = new HashMap<>();
//     list.put(9,"nine");
//     list.put(4,"lkjsd");
//     System.out.println(list.get(9));
// }}


// import java.util.*;

// import java.io.File;
// import java.io.FileWriter;

// class Main{
// public static void main(String args[]){
//     try{
//         File f = new File("file.txt");
//         Scanner ss = new Scanner(f);
//         while(ss.hasNextLine()){
//             System.out.println(ss.nextLine());
//         }
//         ss.close();
//     }

//     catch(Exception e){
//         System.out.println(e);
//     }

//     try{
//         FileWriter f = new FileWriter("file.txt",true);
//         f.write("lkjsfd");
//         f.close();
//     }
//     catch(Exception e){
//         System.out.println(e);
//     }
   
// }}


// import java.util.*;
// class Main{
//     public static void main(String args[]){
//         String s="madaasfdm";
//         String rev="";

//         for( int i=s.length()-1;i>=0;i--){
//             rev+=s.charAt(i);
//         }
//         if(s.equals(rev))
//         System.out.println("pallindrom");
//         else
//         System.out.println("not pallind");
//     }
// }

// import java.util.*;
// class Animal {
//     void sound() {
//         System.out.println("Generic sound");
//     }
// }

// class Dog extends Animal {
//     void sound() {
//         super.sound(); // call parent method
//         System.out.println("Dog barks");
//     }
// }

// class Main {
//     public static void main(String[] args) {
//         Dog d=new Dog();
//         d.sound();
//     }
// }

// import java.util.*;
// class Main{
//     public static void sort(int a[]){
//         int n=a.length;

//         for(int i=0;i<n-1;i++){
//             for(int j=0;j<n-1-i;j++){
//                 if(a[j]>a[j+1]){
//                     int t=a[j];
//                     a[j]=a[j+1];
//                     a[j+1]=t;
//                 }
//             }
//         }
//     }
//     public static void main(String args[]){
//         int arr[]={4,2,5,254,1};
//         sort(arr);
//         for(int i:arr)
//         System.out.println(i);
//     }
// }

// import java.util.*;
// class Main {
//     public static void main(String[] args) {

//         String s = "programming";
//         String dub = "";
//         for(int i=0;i<s.length();i++){
//             char ch=s.charAt(i);
//             System.out.println(dub.indexOf(ch));
//             if(dub.indexOf(ch) == -1)
//             {

           
//              dub+=ch;}

//         }

//         System.out.println(dub);  // Output: progamin
//     }
// }


// import java.util.*;
// class Main {
//     public static void main(String[] args) {
//     String s="priougramming";
//     String v="aeiouAEIOU";
//         int vo=0;
//         int co=0;
//     for(int i=0;i<s.length();i++){
//         if(v.indexOf(s.charAt(i))!=-1)
//         vo++;
//         else
//         co++;
//     }
//     System.out.print(vo+" "+co);
//     }
// }



// import java.util.*;
// class Main {
//     public static int fact(int n){
//         if(n==0)
//         return 1;
//         else
//         return n* fact(n-1);
//     }
//     public static void main(String[] args) {
    
//         System.out.println(fact(4));
//     }
// }


// import java.util.*;
// class Main {
//     public static void main(String[] args) {
//         int n=10, a=0,b=1;
//         System.out.print(a+" "+b+" ");
//         for(int i=2;i<n;i++){
//             int c=a+b;
//             System.out.print(c+ " ");
//             a=b;
//             b=c;
//         }
//     }
// }

// import java.util.*;
// class Main {
//     public static int count(int n){
//         int c=0;
//         while(n>0){
//             c++;
//             n/=10;
//         }
//         return c;
//     }
//     public static void main(String[] args) {
//         int n=9474;
//         int original=n;
//         int c=count(n);
//         int sum=0;
//         while(n>0){
//             int digit= n%10;
//             sum+= Math.pow(digit,c);
//             n/=10;
//         }
//         if(sum==original)
//         System.out.println("arms");
//         else
//         System.out.println("no armms");
//     }
// }


// import java.util.*;
// class Main {
 
//     public static void main(String[] args) {
//      int n=10234;
//      int num=0;
//      while(n>0){
//         int d=n%10;
//         num=num * 10 + d;
//         n /=10;
//      }
//      System.out.println(num);
//     }
// }

// import java.util.*;
// class Main{
//     public static void main(String args[]){
//         for(int i=0;i<7;i++){
//             for(int j=i;j<7;j++)
//             System.out.print(" ");
//             for(int j=0;j<i;j++)
//             System.out.print("*  ");
//             System.out.println();
//         }
       
//     }
// }

// class Main{
//     public static void main(String args[]){
//         int r=6;
//         for(int i=1;i<=r;i++){
//             for(int j=i;j<r;j++)
//             System.out.print(" ");
//             for(int j=1;j<=i;j++)
//             System.out.print("* ");
//             System.out.println();
//         }
//     }
// }


class Main{
    public static void main(String args[]){
        String s1="silenet";
        String s2="listsen";

        if(s1.length()!=s2.length()){
            System.out.println("not");
            return;
        }

        int[] c=new int[256];

        for(int i=0;i<s1.length();i++){
            c[s1.charAt(i)]++;
            c[s2.charAt(i)]--;
        }

        for(int i=0;i<256;i++){
            if(c[i]!=0)
            {
                System.out.println(
                    "not"
                );
                return;
            }
        }
        System.out.println("ana");

    }
}