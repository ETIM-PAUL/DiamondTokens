<script>
  import {
    Navbar,
    NavBrand,
    NavHamburger,
    NavUl,
    NavLi,
    Button,
    Input,
    Textarea,
    Modal,
  } from "flowbite-svelte";
  import { HandThumbDown, HandThumbUp } from "svelte-heros";
  import truncateEthAddress from "truncate-eth-address";

  export let isWalletInstalled, connectWallet, loading, account;

  let truncatedAccount = account === null ? null : truncateEthAddress(account);

  let defaultModal = false;
  let navClass =
    "bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800";
  let navDivClass =
    "flex flex-wrap justify-between items-center mx-auto max-w-screen-xl";
</script>

<header>
  <Navbar let:hidden let:toggle fluid={false} {navClass} {navDivClass}>
    <NavBrand href="/">
      <img
        src="https://flowbite.com/docs/images/logo.svg"
        class="mr-1 sm:mr-3 h-6 sm:h-9"
        alt="Flowbite Logo"
      />
      <span
        class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
      >
        DiamondLabs
      </span>
    </NavBrand>

    {#if isWalletInstalled}
      <div class="flex items-center lg:order-2">
        {#if isWalletInstalled && truncatedAccount === null}
          <button on:click={connectWallet} color="dark">
            Connect Wallet
          </button>
        {:else}
          <button on:click={connectWallet} color="dark">
            {truncatedAccount}
          </button>
        {/if}
        <NavHamburger
          on:click={toggle}
          btnClass="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        />
      </div>
    {:else}
      <div class="flex items-center lg:order-2">
        <a
          href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
        >
          <button color="dark">Install Wallet</button>
        </a>
        <NavHamburger
          on:click={toggle}
          btnClass="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        />
      </div>
    {/if}

    <NavUl
      {hidden}
      divClass="justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
      ulClass="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0"
    >
      <p
        on:click={() => (defaultModal = true)}
        class="hover:cursor-pointer hover:underline"
      >
        Transfer
      </p>
      <NavLi href="/">History</NavLi>
      <NavLi href="/">Approve 3rd Party Agent</NavLi>
      <NavLi href="/">3rd Parties</NavLi>
    </NavUl>
  </Navbar>

  <Modal title="" bind:open={defaultModal} autoclose size="md">
    <div class="flex justify-between mb-4 rounded-t sm:mb-5">
      <div class="text-lg text-gray-900 md:text-xl dark:text-white">
        <h3 class="font-semibold ">Transfer JOE</h3>
      </div>
    </div>
    <div>
      <Input placeholder={`Reciever's Wallet Address`} />
      <Textarea class="mt-2" placeholder={`Additional info`} max={200} />
    </div>
    <div class="flex justify-between items-center gap-3">
      <div class="flex items-center space-x-3 sm:space-x-4">
        <Button>
          <HandThumbUp class="pr-2" />
          Transfer
        </Button>
      </div>
      <Button color="red">
        <HandThumbDown class="pr-2" />

        Cancel
      </Button>
    </div>
  </Modal>
</header>
