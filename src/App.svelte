<script>
  import Body from "./lib/Body.svelte";
  import Header from "./lib/Header.svelte";

  import { onMount } from "svelte";

  import { persist, createLocalStorage } from "@macfja/svelte-persistent-store";
  import { writable } from "svelte/store";

  let account = persist(writable(null), createLocalStorage(), "account");

  let isWalletInstalled = false;
  let loading = false;

  onMount(() => {
    if (window.ethereum) {
      alert("Ethereum support is available");
      isWalletInstalled = true;
    } else {
      alert("Please Installed Metatask");
    }
  });

  async function connectWallet() {
    loading = true;
    setTimeout(() => {
      window.ethereum
        .request({
          method: "eth_requestAccounts",
        })
        .then((accounts) => {
          $account = accounts[0];
          console.log(account);
        })
        .catch((error) => {
          alert("Something went wrong");
        });
      loading = false;
    }, 2000);
  }
</script>

<Header account={$account} {isWalletInstalled} {connectWallet} {loading} />
<Body />

<style>
</style>
