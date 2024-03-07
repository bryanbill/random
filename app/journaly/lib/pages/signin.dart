import 'package:flutter/material.dart';
import 'package:journaly/core/repository/auth.dart';
import 'package:journaly/pages/homepage.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';

class SignIn extends StatefulWidget {
  const SignIn({super.key});

  @override
  State<SignIn> createState() => _SignInState();
}

class _SignInState extends State<SignIn> {
  final emailController = TextEditingController();
  final otpController = TextEditingController();

  final authRepository = AuthRepository();

  Future<void> signIn() async {
    final emailRegex = RegExp(r"^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$");

    if (emailController.text.isEmpty ||
        !emailRegex.hasMatch(emailController.text)) {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
        content: Text("Invalid Email"),
        padding: EdgeInsets.all(8),
        behavior: SnackBarBehavior.floating,
      ));

      return;
    }

    setState(() {
      loading = true;
    });

    final res = await authRepository.signIn(emailController.text.trim());

    if (!res && context.mounted) {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
        content: Text("Something went wrong, try again later"),
        padding: EdgeInsets.all(8),
        behavior: SnackBarBehavior.floating,
      ));

      setState(() {
        loading = false;
      });

      return;
    }

    setState(() {
      loading = false;
      index = 2;
    });

    if (context.mounted) {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
        content: Text("OTP sent to your email"),
        padding: EdgeInsets.all(8),
        behavior: SnackBarBehavior.floating,
      ));
    }
  }

  Future<void> verifyOTP() async {
    if (otpController.text.isEmpty || otpController.text.length < 6) {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
        content: Text("Invalid OTP"),
        padding: EdgeInsets.all(8),
        behavior: SnackBarBehavior.floating,
      ));

      return;
    }

    setState(() {
      loading = true;
    });

    final res = await authRepository.verifyOtp(
        emailController.text.trim(), otpController.text.trim());

    if (!res && context.mounted) {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
        content: Text("Something went wrong, try again later"),
        padding: EdgeInsets.all(8),
        behavior: SnackBarBehavior.floating,
      ));

      setState(() {
        loading = false;
      });

      return;
    }

    setState(() {
      loading = false;
    });

    if (context.mounted) {
      Navigator.pushAndRemoveUntil(
          context,
          MaterialPageRoute(builder: (context) => const HomePage()),
          (route) => false);
    }
  }

  bool loading = false;
  int index = 1;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        FocusScope.of(context).unfocus();
      },
      child: Scaffold(
        body: SingleChildScrollView(
          child: Container(
            height: MediaQuery.of(context).size.height,
            width: MediaQuery.of(context).size.width,
            padding: const EdgeInsets.all(12),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                const Text(
                  "Journaly",
                  style: TextStyle(fontSize: 48),
                ),
                const Text("Welcome Aboard"),
                const SizedBox(
                  height: 40,
                ),
                index == 1
                    ? TextFormField(
                        controller: emailController,
                        keyboardType: TextInputType.emailAddress,
                        decoration: const InputDecoration(
                          border: OutlineInputBorder(),
                          labelText: "Email",
                        ),
                      )
                    : TextFormField(
                        controller: otpController,
                        maxLength: 6,
                        textAlign: TextAlign.center,
                        keyboardType: TextInputType.phone,
                        decoration: const InputDecoration(
                          border: OutlineInputBorder(),
                          labelText: "OTP",
                        ),
                      ),
                const SizedBox(
                  height: 20,
                ),
                SizedBox(
                  width: MediaQuery.of(context).size.width,
                  child: loading
                      ? LoadingAnimationWidget.halfTriangleDot(
                          color: Theme.of(context).colorScheme.primary,
                          size: 32,
                        )
                      : index == 1
                          ? ElevatedButton(
                              style: ElevatedButton.styleFrom(
                                padding: const EdgeInsets.all(12),
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(8),
                                ),
                              ),
                              onPressed: signIn,
                              child: const Text("Sign In"),
                            )
                          : ElevatedButton(
                              style: ElevatedButton.styleFrom(
                                padding: const EdgeInsets.all(12),
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(8),
                                ),
                              ),
                              onPressed: verifyOTP,
                              child: const Text("Verify OTP"),
                            ),
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}
